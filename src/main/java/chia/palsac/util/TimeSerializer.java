package chia.palsac.util;

import java.io.IOException;

import org.joda.time.LocalTime;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

/**
 * Custom serializer for a {@link LocalTime} object
 * 
 * @author alice.chen
 *
 */
public class TimeSerializer extends JsonSerializer<LocalTime> {	
	
	public TimeSerializer() {};
	
	@Override
	public void serialize(LocalTime time, JsonGenerator gen,
			SerializerProvider arg2) throws IOException,
			JsonProcessingException {
		gen.writeObject(DateTimeUtil.TIME_FORMATTER.print(time));	
	}
}
