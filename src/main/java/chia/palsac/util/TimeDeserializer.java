package chia.palsac.util;

import java.io.IOException;

import org.joda.time.LocalTime;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

/**
 * Custom deserializer for a {@link LocalTime} object
 * 
 * @author alice.chen
 *
 */
public class TimeDeserializer extends JsonDeserializer<LocalTime> {
	
	public TimeDeserializer() {};
	
	@Override
	public LocalTime deserialize(JsonParser parser, DeserializationContext context)
			throws IOException, JsonProcessingException {
		return DateTimeUtil.TIME_FORMATTER.parseLocalTime(parser.getText());
	}
}
