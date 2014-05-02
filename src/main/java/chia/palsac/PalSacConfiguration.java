package chia.palsac;

import io.dropwizard.Configuration;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import com.bazaarvoice.dropwizard.assets.AssetsBundleConfiguration;
import com.bazaarvoice.dropwizard.assets.AssetsConfiguration;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Representation of the YAML configuration of the application
 * 
 * @author alice.chen
 *
 */
public class PalSacConfiguration extends Configuration implements
		AssetsBundleConfiguration {

	@Valid
	@NotNull
	@JsonProperty
	private final AssetsConfiguration assets = new AssetsConfiguration();
	
	@Valid
	@NotNull
	@JsonProperty
	private final MongoConfiguration mongo = new MongoConfiguration();
	
	public AssetsConfiguration getAssetsConfiguration() {
		return assets;
	}
	
	public MongoConfiguration getMongoConfiguration() {
		return mongo;
	}
	
}
