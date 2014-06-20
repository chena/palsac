package chia.palsac;

import java.net.UnknownHostException;

import net.vz.mongodb.jackson.JacksonDBCollection;
import chia.palsac.api.Chapter;
import chia.palsac.api.Event;
import chia.palsac.api.Venue;
import chia.palsac.mongo.MongoConfiguration;

import com.google.inject.Binder;
import com.google.inject.Module;
import com.google.inject.Provides;
import com.mongodb.DB;
import com.mongodb.Mongo;

public class PalSacModule implements Module {

	public void configure(Binder arg0) {
		// pass
	}
	
	@Provides
	public MongoConfiguration provideMongoConfig(PalSacConfiguration config) {
		return config.getMongoConfiguration();
	}
	
	@Provides
	public Mongo provideMongoClient(MongoConfiguration mongoConfig) throws UnknownHostException {
		return new Mongo(mongoConfig.getHost(), mongoConfig.getPort());
	}
	
	@Provides
	public DB getMongoDB(MongoConfiguration mongoConfig, Mongo mongo) {
		return mongo.getDB(mongoConfig.getDB());
	}
	
	@Provides
	public JacksonDBCollection<Chapter, String> getChaptersCollection(DB mongoDB) {
		return JacksonDBCollection.wrap(mongoDB.getCollection("chapters"), Chapter.class, String.class);
	}
	
	@Provides
	public JacksonDBCollection<Venue, String> getVenuesCollection(DB mongoDB) {
		return JacksonDBCollection.wrap(mongoDB.getCollection("venues"), Venue.class, String.class);
	}
	
	@Provides
	public JacksonDBCollection<Event, String> getEventsCollection(DB mongoDB) {
		return JacksonDBCollection.wrap(mongoDB.getCollection("events"), Event.class, String.class);
	}
}
