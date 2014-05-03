package chia.palsac;

import java.net.UnknownHostException;

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
	
}
