package chia.palsac.api;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.URL;

public class Chapter {
	
	@NotBlank
	private final String userID;
	
	@Email
	@NotBlank
	private final String email;
	
	@URL
	private final String groupURL;
	
	private final String eventType;
	
	public Chapter(String userID, String email, String groupURL, String eventType) {
		this.userID = userID;
		this.email = email;
		this.groupURL = groupURL;
		this.eventType = eventType;
	}
	
	public String getUserID() {
		return userID;
	}
	
	public String getEmail() {
		return email;
	}

	public String getGroupURL() {
		return groupURL;
	}
	
	public String eventType() {
		return eventType;
	}
	
}
