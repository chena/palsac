package chia.palsac.resources;

import java.io.IOException;
import java.net.URL;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.common.base.Charsets;
import com.google.common.io.Resources;

/**
 * Client endpoint for serving the application index page
 * 
 * @author alice.chen
 *
 */
@Path("/")
@Produces(MediaType.TEXT_HTML)
public class ClientResource {
	
	@GET
	public Response getPage() throws IOException {
		URL clientPage = Resources.getResource("app/index.html");
	    return Response.ok(Resources.toString(clientPage, Charsets.UTF_8)).build();	
	}
	
	public static void main(String[] args) {
		System.out.println("Hello World!");
	}
}
