package chia.palsac.util;

import java.io.IOException;

import org.apache.commons.lang3.StringUtils;
import org.joda.time.LocalDate;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

/**
 * Custom deserializer for a {@link LocalDate} object
 * 
 * @author alice.chen
 *
 */
public class DateDeserializer extends JsonDeserializer<LocalDate> {
	@Override
	public LocalDate deserialize(JsonParser parser, DeserializationContext context)
			throws IOException, JsonProcessingException {
		
		String input = parser.getText();
		if (StringUtils.isBlank(input)) {
			return null;
		}
		return DateTimeUtil.DATE_FORMATTER.parseLocalDate(input);
	}
}
