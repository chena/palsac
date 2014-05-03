package chia.palsac.mongo;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Representation for the mongo section of the YAML configuration
 * 
 * @author alice.chen
 *
 */
public class MongoConfiguration {
	
	@NotEmpty
	@JsonProperty
	private String host;

	@NotNull
	@Min(1)
	@Max(65535)
	@JsonProperty
	private int port;

	@NotEmpty
	@JsonProperty
	private String db;
	
	public String getHost() {
		return host;
	}

	public int getPort() {
		return port;
	}
	
	public String getDB() {
		return db;
	}

}
