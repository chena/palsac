package chia.palsac;

import io.dropwizard.Application;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;

import com.bazaarvoice.dropwizard.assets.ConfiguredAssetsBundle;

/**
 * Entry point of our Pal-Sac service
 * 
 * @author alice.chen
 *
 */
public class PalSacApplication extends Application<PalSacConfiguration>{

	@Override
	public void initialize(Bootstrap<PalSacConfiguration> bootstrap) {
		//bootstrap.addBundle(new AssetsBundle("/app", "/app"));
		bootstrap.addBundle(new ConfiguredAssetsBundle("/app", "/app"));
	}

	@Override
	public void run(PalSacConfiguration config, Environment env)
			throws Exception {
		env.jersey().register(new ClientResource());
	}
	
	public static void main(String[] args) throws Exception {
		new PalSacApplication().run(args);
	}
	
}
