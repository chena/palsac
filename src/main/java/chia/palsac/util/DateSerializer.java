package chia.palsac.util;

import java.io.IOException;

import org.joda.time.LocalDate;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

/**
 * Custom serializer for a {@link LocalDate} object
 * 
 * @author alice.chen
 *
 */
public class DateSerializer extends JsonSerializer<LocalDate> {	
	@Override
	public void serialize(LocalDate date, JsonGenerator gen,
			SerializerProvider arg2) throws IOException,
			JsonProcessingException {
		gen.writeObject(DateTimeUtil.DATE_FORMATTER.print(date));	
	}
}