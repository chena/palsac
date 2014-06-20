package chia.palsac.api;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import net.vz.mongodb.jackson.Id;

import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.URL;

/**
 * Representation of a Chapter API object
 * 
 * @author alice.chen
 *
 */
public class Chapter {
	
	@Id
	public String id;
	
	@NotBlank
	private String userId; // the Facebook ID of chapter creator
	
	@NotNull
	@Valid
	private Venue venue;
	
	@NotNull
	private Boolean active;
	
	@NotNull
	@Valid
	private List<Organizer> organizers;
	
	@Valid
	private List<Event> events;
	
	@URL
	private String facebookPage;
	
	private String note;
	
	public String getUserId() {
		return userId;
	}
	
	public Venue getVenue() {
		return venue;
	}
	
	public Boolean getActive() {
		return active;
	}
	
	public List<Organizer> getOrganizers() {
		return organizers;
	}
	
	public List<Event> getEvents() {
		return events;
	}
	
	public String getFacebookPage() {
		return facebookPage;
	}
	
	public String getNote() {
		return note;
	}
}
