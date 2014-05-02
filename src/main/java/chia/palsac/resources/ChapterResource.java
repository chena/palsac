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

import ch.qos.logback.core.status.Status;
import chia.palsac.api.Chapter;

import com.google.common.collect.Lists;
import com.google.inject.Inject;
import com.mongodb.DB;
import com.mongodb.DBCollection;

/**
 *  Resource endpoints  for {@link Chapter} 
 * 
 * @author alice.chen
 *
 */
@Path("/")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ChapterResource {
	
	private DBCollection chapterCollection;
	
	@Inject
	public ChapterResource(DB mongoDB) {
		this.chapterCollection = mongoDB.getCollection("chapter");
	}
	
	@GET
	public List<Chapter> getAllChapeters() {
		//mongoDB.getCollection("chapter");
		return Lists.newArrayList();
	}
	
	@POST
	public Response addNewChapter(@Valid Chapter chapter) {
		
		return Response.ok().build();
	}
}
