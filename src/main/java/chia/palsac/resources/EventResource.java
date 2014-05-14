package chia.palsac.resources;

import java.util.List;

import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import net.vz.mongodb.jackson.JacksonDBCollection;
import chia.palsac.api.Event;

import com.google.inject.Inject;
import com.mongodb.DB;

/**
 *  Resource endpoints  for {@link Event} 
 * 
 * @author alice.chen
 *
 */
@Path("/api/events")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class EventResource {
	
	private JacksonDBCollection<Event, String> collection;
	
	@Inject
	public EventResource(DB mongoDB) {
		this.collection = JacksonDBCollection.wrap(mongoDB.getCollection("events"), Event.class, String.class);
	}
	
	@GET
	public List<Event> getAllChapeters() {
		return collection.find().toArray();
	}
	
	@POST
	public Response addNewEvent(@Valid Event event) {
//		if (collection.find().is("userId", event.getUserId()).hasNext()) {
//			// FIXME: throw ConstraintViolationException here?
//			return Response.status(422).build() ;
//		};
		
		collection.save(event);
		return Response.status(Status.CREATED).entity(event).build();
	}
}
