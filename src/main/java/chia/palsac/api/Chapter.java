package chia.palsac.api;

import net.vz.mongodb.jackson.Id;

import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.URL;
import org.joda.time.DateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Representation of a chapter API object
 * 
 * @author alice.chen
 *
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class Chapter {
	
	@Id
	public String id;
	
	@NotBlank
	private String userId;
	
	@NotBlank
	private String name;
	
	@NotBlank
	private String address;
	
	@NotBlank
	private String eventType;
	
	//@SerializeWith()
	//@DeserializeWith()
	private DateTime startDateTime;
	
	//@SerializeWith()
	//@DeserializeWith()
	private DateTime endDateTime;

	@URL
	private String url;
	
	public String getUserId() {
		return userId;
	}
	
	public String getName() {
		return name;
	}

	public String getEventType() {
		return eventType;
	}
	
	public String getAddress() {
		return address;
	}
	
	public DateTime getStartDateTime() {
		return startDateTime;
	}

	public DateTime getEndDateTime() {
		return endDateTime;
	}
	
	public String getURL() {
		return url;
	}
}
