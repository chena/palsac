package chia.palsac.api;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

/**
 * Representation of a user API object.
 * 
 * @author alice.chen
 *
 */
public class User {
	
	@NotBlank
	private String userID;
	
	@Email
	@NotBlank
	private String email;
	
	public String getUserID() {
		return userID;
	}
	
	public String getEmail() {
		return email;
	}
	
}
