package chia.palsac;

import io.dropwizard.lifecycle.Managed;

import java.net.UnknownHostException;

import com.google.inject.Inject;
import com.mongodb.MongoClient;

/**
 * Manages the life cycle of the MongoDB instance in the application.
 * 
 * @author alice.chen
 *
 */
public class MongoManager implements Managed {
	
	private final MongoClient mongo;
	
	@Inject
	public MongoManager(MongoConfiguration config) throws UnknownHostException {
		this.mongo = new MongoClient(config.getHost(), config.getPort());
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
