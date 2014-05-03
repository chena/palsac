package chia.palsac;

import io.dropwizard.lifecycle.Managed;

import java.net.UnknownHostException;

import com.google.inject.Inject;
import com.mongodb.Mongo;

/**
 * Manages the life cycle of the MongoDB instance in the application.
 * 
 * @author alice.chen
 *
 */
public class MongoManager implements Managed {
	
	private final Mongo mongo;
	
	@Inject
	public MongoManager(MongoConfiguration config) throws UnknownHostException {
		this.mongo = new Mongo(config.getHost(), config.getPort());
	}
	
	public void start() throws Exception {
		// pass
	}

	public void stop() throws Exception {
		if (mongo != null) {
			mongo.close();
		}
	}

}
