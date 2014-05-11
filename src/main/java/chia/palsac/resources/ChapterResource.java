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
import chia.palsac.api.Chapter;

import com.google.inject.Inject;
import com.mongodb.DB;

/**
 *  Resource endpoints  for {@link Chapter} 
 * 
 * @author alice.chen
 *
 */
@Path("/api/chapters")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ChapterResource {
	
	private JacksonDBCollection<Chapter, String> collection;
	
	@Inject
	public ChapterResource(DB mongoDB) {
		this.collection = JacksonDBCollection.wrap(mongoDB.getCollection("chapters"), Chapter.class, String.class);
	}
	
	@GET
	public List<Chapter> getAllChapeters() {
		System.out.println(collection.find().iterator().next().getStartDateTime());
		return collection.find().toArray();
	}
	
	@POST
	public Response addNewChapter(@Valid Chapter chapter) {
//		if (collection.find().is("userId", chapter.getUserId()).hasNext()) {
//			// FIXME: throw ConstraintViolationException here?
//			return Response.status(422).build() ;
//		};
		
		collection.save(chapter);
		return Response.status(Status.CREATED).entity(chapter).build();
	}
}
