package chia.palsac.api;

import org.hibernate.validator.constraints.Email;

/**
 * Representation of an organizer API object.
 * 
 * @author alice.chen
 *
 */
public class Organizer {
	
	private String name;
	
	@Email
	private String email;
	
	public String getName() {
		return name;
	}
	
	public String getEmail() {
		return email;
	}
	
}
