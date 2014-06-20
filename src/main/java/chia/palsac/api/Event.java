package chia.palsac.api;

import io.dropwizard.validation.ValidationMethod;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import net.vz.mongodb.jackson.Id;

import org.apache.commons.lang3.StringUtils;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;
import org.joda.time.LocalDate;
import org.joda.time.LocalTime;

import chia.palsac.util.DateDeserializer;
import chia.palsac.util.DateSerializer;
import chia.palsac.util.DateTimeUtil;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

/**
 * Representation of an Event API object
 * 
 * @author alice.chen
 *
 */
public class Event {

	// TODO: validate date >= today
	
	@Id
	public String id;
	
	@NotBlank
	@Length(max = 60)
	private String title;
	
	@NotNull
	@Valid
	private Chapter chapter;
	
	@JsonSerialize(using = DateSerializer.class)
	@JsonDeserialize(using = DateDeserializer.class)
	private LocalDate date;
	
	@NotBlank
	private String startTime;
	
	@NotBlank
	private String endTime;
	
	@NotNull
	private Boolean active;
	
	public String getTitle() {
		return title;
	}
	
	public Chapter getChapter() {
		return chapter;
	}
	
	public LocalDate getDate() {
		return date;
	}
	
	public String getStartTime() {
		return startTime;
	}

	public String getEndTime() {
		return endTime;
	}
	
	public Boolean getActive() {
		return active;
	}
	
	@JsonIgnore
	@ValidationMethod(message = "Invalid start time")
	public boolean isValidStartTime() {
		// let the field annotation @NotBlank handle blank input
		if (StringUtils.isBlank(startTime)) {
			return true;
		}
		
		try {
			DateTimeUtil.parseTime(startTime);
		} catch (IllegalArgumentException e) {
			return false;
		}
		
		return true;
	}
	
	@JsonIgnore
	@ValidationMethod(message = "Invalid end time")
	public boolean isValidEndTime() {
		// let the field annotation @NotBlank handle blank input
		if (StringUtils.isBlank(endTime)) {
			return true;
		}
		
		try {
			DateTimeUtil.parseTime(endTime);
		} catch (IllegalArgumentException e) {
			return false;
		}
		return true;
	}
	
	@JsonIgnore
	@ValidationMethod(message = "End time must be after start time")
	public boolean isValidTimeRange() {
		try {
			LocalTime start = DateTimeUtil.parseTime(startTime);
			LocalTime end = DateTimeUtil.parseTime(endTime);
			return start.isBefore(end);
		} catch (IllegalArgumentException e) {
			return true; // let the individual time validation method handle invalid input
		}
	}
}
