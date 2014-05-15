package chia.palsac.api;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import net.vz.mongodb.jackson.Id;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.URL;
import org.joda.time.DateTime;
import org.joda.time.LocalTime;

import chia.palsac.util.DateDeserializer;
import chia.palsac.util.DateSerializer;
import chia.palsac.util.TimeDeserializer;
import chia.palsac.util.TimeSerializer;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

/**
 * Representation of an Event API object
 * 
 * @author alice.chen
 *
 */
public class Event {
	
	@Id
	public String id;
	
	@NotBlank
	private String userId;
	
	@NotBlank
	@Length(max = 60)
	private String title;
	
	@NotNull
	@Valid
	private Venue venue;
	
	@NotBlank
	private String type;
	
	@JsonSerialize(using = DateSerializer.class)
	@JsonDeserialize(using = DateDeserializer.class)
	private DateTime date;
	
	private String repeatDescription;
	
	@JsonSerialize(using = TimeSerializer.class)
	@JsonDeserialize(using = TimeDeserializer.class)
	@NotNull
	private LocalTime startTime;
	
	@JsonSerialize(using = TimeSerializer.class)
	@JsonDeserialize(using = TimeDeserializer.class)
	@NotNull
	private LocalTime endTime;
	
	@NotNull
	private Boolean active;
	
	@NotNull
	@Valid
	private Organizer organizer;
	
	@URL
	private String facebookPage;
	
	private String note;
	
	public String getUserId() {
		return userId;
	}
	
	public String getTitle() {
		return title;
	}
	
	public Venue getVenue() {
		return venue;
	}
	
	public String getType() {
		return type;
	}
	
	public DateTime getDate() {
		return date;
	}
	
	public String getRepeatDescription() {
		return repeatDescription;
	}
	
	public LocalTime getStartTime() {
		return startTime;
	}

	public LocalTime getEndTime() {
		return endTime;
	}
	
	public Boolean getActive() {
		return active;
	}
	
	public Organizer getOrganizer() {
		return organizer;
	}
	
	public String getFacebookPage() {
		return facebookPage;
	}
	
	public String getNote() {
		return note;
	}
	
	// TODO: validation methods
}
