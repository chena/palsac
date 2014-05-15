package chia.palsac.api;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

/**
 * Representation of an organizer API object.
 * 
 * @author alice.chen
 *
 */
public class Organizer {
	
	@NotBlank
	private String name;
	
	@Email
	@NotBlank
	private String email;
	
	public String getName() {
		return name;
	}
	
	public String getEmail() {
		return email;
	}
	
}
