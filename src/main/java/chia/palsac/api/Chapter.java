package chia.palsac.api;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.URL;

public class Chapter {
	
	@NotBlank
	private String userID;
	
	@Email
	@NotBlank
	private String email;
	
	@URL
	private String groupURL;
	
	private String eventType;
		
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
