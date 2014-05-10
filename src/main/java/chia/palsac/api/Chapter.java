package chia.palsac.api;

import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.URL;

/**
 * Representation of a chapter API object
 * 
 * @author alice.chen
 *
 */
public class Chapter {
	
	@NotBlank
	private String userID;
	
	@URL
	private String groupURL;
	
	private String eventType;
	
	@NotBlank
	private String address;

	public String getUserID() {
		return userID;
	}
	
	public String getGroupURL() {
		return groupURL;
	}
	
	public String eventType() {
		return eventType;
	}
	
	public String getAddress() {
		return address;
	}
	
}
