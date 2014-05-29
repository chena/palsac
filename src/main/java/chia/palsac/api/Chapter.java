package chia.palsac.api;

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
	private String userId;
	
	@NotNull
	@Valid
	private Event event;
	
	@NotNull
	@Valid
	private Venue venue;
	
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
	
	public Venue getVenue() {
		return venue;
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
	
}
