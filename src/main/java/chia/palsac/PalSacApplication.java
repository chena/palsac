package chia.palsac;

import io.dropwizard.Application;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import chia.palsac.resources.ClientResource;

import com.bazaarvoice.dropwizard.assets.ConfiguredAssetsBundle;
import com.hubspot.dropwizard.guice.GuiceBundle;
import com.mongodb.DB;

/**
 * Entry point of our Pal-Sac service
 * 
 * @author alice.chen
 * 
 */
public class PalSacApplication extends Application<PalSacConfiguration> {

	@Override
	public void initialize(Bootstrap<PalSacConfiguration> bootstrap) {
		// add Guice bundle for dependency injection
		bootstrap.addBundle(GuiceBundle.<PalSacConfiguration>newBuilder()
				.addModule(new PalSacModule())
				.setConfigClass(PalSacConfiguration.class)
				.enableAutoConfig(getClass().getPackage().getName()) // enable auto configuration via package scanning.
				.build());
		
		bootstrap.addBundle(new ConfiguredAssetsBundle("/app", "/app"));
	}

	@Override
	public void run(PalSacConfiguration config, Environment env)
			throws Exception {
		// nothing to do here - everything is handled by Guice auto configuration
	}

	public static void main(String[] args) throws Exception {
		new PalSacApplication().run(args);
	}

}
