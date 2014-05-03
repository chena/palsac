package chia.palsac.mongo;

import com.google.common.base.Preconditions;
import com.google.inject.Inject;
import com.hubspot.dropwizard.guice.InjectableHealthCheck;
import com.mongodb.Mongo;

public class MongoHealthCheck extends InjectableHealthCheck {
	
	private final Mongo mongo;

	@Inject
    public MongoHealthCheck(Mongo mongo) {
        this.mongo = mongo;
    }

    @Override
    protected Result check() throws Exception {
    	Preconditions.checkNotNull(mongo).getDatabaseNames();
    	return Result.healthy();
    }

	@Override
	public String getName() {
		return "mongoDB";
	}

}
