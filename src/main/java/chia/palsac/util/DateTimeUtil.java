package chia.palsac.util;

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

}
