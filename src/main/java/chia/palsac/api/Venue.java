package chia.palsac.api;

import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.URL;

/**
 * Representation of a venue API object
 * 
 * @author alice.chen
 *
 */
public class Venue {
	
	private String name;
	
	@NotBlank
	private String address;
	
	private double longtitude;
	private double latitude;
	
	@URL
	private String website;
	
	public String getName() {
		return name;
	}
	
	public String getAddress() {
		return address;
	}
	
	public double getLongtitude() {
		return longtitude;
	}
	
	public double getLatitude() {
		return latitude;
	}
	
	public String getWebsite() {
		return website;
	}
}
