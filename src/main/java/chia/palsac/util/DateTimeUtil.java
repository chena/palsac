package chia.palsac.util;

import org.joda.time.LocalDate;
import org.joda.time.LocalTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

/**
 * Constants and utility for date/time conversions
 * 
 * @author alice.chen
 *
 */
public final class DateTimeUtil {
	
	public static final DateTimeFormatter DATE_FORMATTER = DateTimeFormat.forPattern("yyyy/MM/dd");
	public static final DateTimeFormatter TIME_FORMATTER = DateTimeFormat.forPattern("h:mm aa");

	public static LocalTime parseTime(String time) {
		return TIME_FORMATTER.parseLocalTime(time);
	}
	
	public static LocalDate parseDate(String date) {
		return DATE_FORMATTER.parseLocalDate(date);
	}
	
}
