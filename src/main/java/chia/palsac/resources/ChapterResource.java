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
import chia.palsac.api.Venue;

import com.google.inject.Inject;

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
	
	private JacksonDBCollection<Chapter, String> chapterCollection;
	
	@Inject
	public ChapterResource(JacksonDBCollection<Chapter, String> chapters, JacksonDBCollection<Venue, String> venues) {
		this.chapterCollection = chapters;
	}
	
	@GET
	public List<Chapter> getAllChapeters() {
		return chapterCollection.find().toArray();
	}
	
	@POST
	public Response addNewChapter(@Valid Chapter chapter) {
		return Response.status(Status.CREATED)
				.entity(chapterCollection.save(chapter)
				.getSavedObject()).build();
	}
}
