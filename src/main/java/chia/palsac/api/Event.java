package chia.palsac.api;

import javax.validation.constraints.NotNull;

import net.vz.mongodb.jackson.Id;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.URL;
import org.joda.time.DateTime;
import org.joda.time.LocalTime;

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
	
	// Venue
	@NotBlank
	private String venueName;
	@NotBlank
	private String address;
	@URL
	private String venueWebsite;
	
	// Event
	@NotBlank
	private String eventType;
	//@SerializeWith()
	//@DeserializeWith()
	private DateTime date;
	private String description;
	//@SerializeWith()
	//@DeserializeWith()
	@NotBlank
	private LocalTime startTime;
	//@SerializeWith()
	//@DeserializeWith()
	@NotBlank
	private LocalTime endTime;
	@NotNull
	private Boolean active;
	
	// Organizer
	@NotBlank
	private String organizerName;
	@Email
	@NotBlank
	private String organizerEmail;
	
	// Others
	@URL
	private String facebookPage;
	private String note;
	
	public String getUserId() {
		return userId;
	}
	
	public String getVenueName() {
		return venueName;
	}
	
	public String getAddress() {
		return address;
	}
	
	public String getVenueWebsite() {
		return venueWebsite;
	}

	public String getEventType() {
		return eventType;
	}
	
	public DateTime getDate() {
		return date;
	}
	
	public String getDescription() {
		return description;
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
	
	public String getOrganizerName() {
		return organizerName;
	}
	
	public String getEmail() {
		return organizerEmail;
	}
	
	public String getFacebookPage() {
		return facebookPage;
	}
	
	public String getNote() {
		return note;
	}
}
