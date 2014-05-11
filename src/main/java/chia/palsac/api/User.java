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
	private String userId;
	
	@NotBlank
	private String fullName;
	
	@Email
	@NotBlank
	private String email;
	
	public String getUserId() {
		return userId;
	}
	
	public String getFullName() {
		return fullName;
	}
	
	public String getEmail() {
		return email;
	}
	
}
