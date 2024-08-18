/*
*=========================================
*       INSTALLATION INSTRUCTIONS
*=========================================
*
* 1) Make a copy:
*      New Interface: Go to the project overview icon on the left (looks like this: ⓘ), then click the "copy" icon on the top right (looks like two files on top of each other)
*      Old Interface: Click in the menu "File" > "Make a copy..." and make a copy to your Google Drive
* 2) Settings: Change lines 24-50 to be the settings that you want to use
* 3) Install:
*      New Interface: Make sure your toolbar says "install" to the right of "Debug", then click "Run"
*      Old Interface: Click "Run" > "Run function" > "install"
* 4) Authorize: You will be prompted to authorize the program and will need to click "Advanced" > "Go to GAS-ICS-Sync (unsafe)"
*      - For steps to follow in authorization, see this video: https://youtu.be/_5k10maGtek?t=1m22s
*      - To learn more about the permissions requested by the script visit https://github.com/derekantrican/GAS-ICS-Sync/wiki/Understanding-Permissions-in-GAS%E2%80%90ICS%E2%80%90Sync
* 5) You can also run "startSync" if you want to sync only once (New Interface: change the dropdown to the right of "Debug" from "install" to "startSync")
*
* **To stop the Script from running click in the menu "Run" > "Run function" > "uninstall" (New Interface: change the dropdown to the right of "Debug" from "install" to "uninstall")
*
*=========================================
*               SETTINGS
*=========================================
*/

const scriptProperties_ = PropertiesService.getScriptProperties().getProperties();

var sourceCalendars = [
  // The ics/ical urls that you want to get events from along with their target calendar IDs (list a new row for each mapping of ICS url to Google Calendar)
  // For instance: ["https://p24-calendars.icloud.com/holidays/us_en.ics", "abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789@group.calendar.google.com"]
  // Or with colors following mapping https://developers.google.com/apps-script/reference/calendar/event-color,
  // for instance: ["https://p24-calendars.icloud.com/holidays/us_en.ics", "abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789@group.calendar.google.com", "11"]
  // The defaults below allow these to be configured using the GAS Project Settings > Script
  // Properties. If you use this approach, you may want to create corresponding properties in
  // Project Settings like `calendar_A_source_1_name` and `calendar_A_target_name` to help you
  // remember which is which (for information only - this script wouldn't read them).
  [scriptProperties_["calendar_A_source_1_ics"], scriptProperties_["calendar_A_target_calendar_id"]],
  [scriptProperties_["calendar_A_source_2_ics"], scriptProperties_["calendar_A_target_calendar_id"]],
  [scriptProperties_["calendar_A_source_3_ics"], scriptProperties_["calendar_A_target_calendar_id"]],
  [scriptProperties_["calendar_A_source_4_ics"], scriptProperties_["calendar_A_target_calendar_id"]],
  [scriptProperties_["calendar_A_source_5_ics"], scriptProperties_["calendar_A_target_calendar_id"]],
  [scriptProperties_["calendar_A_source_6_ics"], scriptProperties_["calendar_A_target_calendar_id"]],
  [scriptProperties_["calendar_A_source_7_ics"], scriptProperties_["calendar_A_target_calendar_id"]],
  [scriptProperties_["calendar_A_source_8_ics"], scriptProperties_["calendar_A_target_calendar_id"]],
  [scriptProperties_["calendar_A_source_9_ics"], scriptProperties_["calendar_A_target_calendar_id"]],
  [scriptProperties_["calendar_B_source_1_ics"], scriptProperties_["calendar_B_target_calendar_id"]],
  [scriptProperties_["calendar_B_source_2_ics"], scriptProperties_["calendar_B_target_calendar_id"]],
  [scriptProperties_["calendar_B_source_3_ics"], scriptProperties_["calendar_B_target_calendar_id"]],
  [scriptProperties_["calendar_B_source_4_ics"], scriptProperties_["calendar_B_target_calendar_id"]],
  [scriptProperties_["calendar_B_source_5_ics"], scriptProperties_["calendar_B_target_calendar_id"]],
  [scriptProperties_["calendar_B_source_6_ics"], scriptProperties_["calendar_B_target_calendar_id"]],
  [scriptProperties_["calendar_B_source_7_ics"], scriptProperties_["calendar_B_target_calendar_id"]],
  [scriptProperties_["calendar_B_source_8_ics"], scriptProperties_["calendar_B_target_calendar_id"]],
  [scriptProperties_["calendar_B_source_9_ics"], scriptProperties_["calendar_B_target_calendar_id"]],
  [scriptProperties_["calendar_C_source_1_ics"], scriptProperties_["calendar_C_target_calendar_id"]],
  [scriptProperties_["calendar_C_source_2_ics"], scriptProperties_["calendar_C_target_calendar_id"]],
  [scriptProperties_["calendar_C_source_3_ics"], scriptProperties_["calendar_C_target_calendar_id"]],
  [scriptProperties_["calendar_C_source_4_ics"], scriptProperties_["calendar_C_target_calendar_id"]],
  [scriptProperties_["calendar_C_source_5_ics"], scriptProperties_["calendar_C_target_calendar_id"]],
  [scriptProperties_["calendar_C_source_6_ics"], scriptProperties_["calendar_C_target_calendar_id"]],
  [scriptProperties_["calendar_C_source_7_ics"], scriptProperties_["calendar_C_target_calendar_id"]],
  [scriptProperties_["calendar_C_source_8_ics"], scriptProperties_["calendar_C_target_calendar_id"]],
  [scriptProperties_["calendar_C_source_9_ics"], scriptProperties_["calendar_C_target_calendar_id"]],
  [scriptProperties_["calendar_D_source_1_ics"], scriptProperties_["calendar_D_target_calendar_id"]],
  [scriptProperties_["calendar_D_source_2_ics"], scriptProperties_["calendar_D_target_calendar_id"]],
  [scriptProperties_["calendar_D_source_3_ics"], scriptProperties_["calendar_D_target_calendar_id"]],
  [scriptProperties_["calendar_D_source_4_ics"], scriptProperties_["calendar_D_target_calendar_id"]],
  [scriptProperties_["calendar_D_source_5_ics"], scriptProperties_["calendar_D_target_calendar_id"]],
  [scriptProperties_["calendar_D_source_6_ics"], scriptProperties_["calendar_D_target_calendar_id"]],
  [scriptProperties_["calendar_D_source_7_ics"], scriptProperties_["calendar_D_target_calendar_id"]],
  [scriptProperties_["calendar_D_source_8_ics"], scriptProperties_["calendar_D_target_calendar_id"]],
  [scriptProperties_["calendar_D_source_9_ics"], scriptProperties_["calendar_D_target_calendar_id"]],
  [scriptProperties_["calendar_E_source_1_ics"], scriptProperties_["calendar_E_target_calendar_id"]],
  [scriptProperties_["calendar_E_source_2_ics"], scriptProperties_["calendar_E_target_calendar_id"]],
  [scriptProperties_["calendar_E_source_3_ics"], scriptProperties_["calendar_E_target_calendar_id"]],
  [scriptProperties_["calendar_E_source_4_ics"], scriptProperties_["calendar_E_target_calendar_id"]],
  [scriptProperties_["calendar_E_source_5_ics"], scriptProperties_["calendar_E_target_calendar_id"]],
  [scriptProperties_["calendar_E_source_6_ics"], scriptProperties_["calendar_E_target_calendar_id"]],
  [scriptProperties_["calendar_E_source_7_ics"], scriptProperties_["calendar_E_target_calendar_id"]],
  [scriptProperties_["calendar_E_source_8_ics"], scriptProperties_["calendar_E_target_calendar_id"]],
  [scriptProperties_["calendar_E_source_9_ics"], scriptProperties_["calendar_E_target_calendar_id"]],
  [scriptProperties_["calendar_F_source_1_ics"], scriptProperties_["calendar_F_target_calendar_id"]],
  [scriptProperties_["calendar_F_source_2_ics"], scriptProperties_["calendar_F_target_calendar_id"]],
  [scriptProperties_["calendar_F_source_3_ics"], scriptProperties_["calendar_F_target_calendar_id"]],
  [scriptProperties_["calendar_F_source_4_ics"], scriptProperties_["calendar_F_target_calendar_id"]],
  [scriptProperties_["calendar_F_source_5_ics"], scriptProperties_["calendar_F_target_calendar_id"]],
  [scriptProperties_["calendar_F_source_6_ics"], scriptProperties_["calendar_F_target_calendar_id"]],
  [scriptProperties_["calendar_F_source_7_ics"], scriptProperties_["calendar_F_target_calendar_id"]],
  [scriptProperties_["calendar_F_source_8_ics"], scriptProperties_["calendar_F_target_calendar_id"]],
  [scriptProperties_["calendar_F_source_9_ics"], scriptProperties_["calendar_F_target_calendar_id"]],
  [scriptProperties_["calendar_G_source_1_ics"], scriptProperties_["calendar_G_target_calendar_id"]],
  [scriptProperties_["calendar_G_source_2_ics"], scriptProperties_["calendar_G_target_calendar_id"]],
  [scriptProperties_["calendar_G_source_3_ics"], scriptProperties_["calendar_G_target_calendar_id"]],
  [scriptProperties_["calendar_G_source_4_ics"], scriptProperties_["calendar_G_target_calendar_id"]],
  [scriptProperties_["calendar_G_source_5_ics"], scriptProperties_["calendar_G_target_calendar_id"]],
  [scriptProperties_["calendar_G_source_6_ics"], scriptProperties_["calendar_G_target_calendar_id"]],
  [scriptProperties_["calendar_G_source_7_ics"], scriptProperties_["calendar_G_target_calendar_id"]],
  [scriptProperties_["calendar_G_source_8_ics"], scriptProperties_["calendar_G_target_calendar_id"]],
  [scriptProperties_["calendar_G_source_9_ics"], scriptProperties_["calendar_G_target_calendar_id"]],
  [scriptProperties_["calendar_H_source_1_ics"], scriptProperties_["calendar_H_target_calendar_id"]],
  [scriptProperties_["calendar_H_source_2_ics"], scriptProperties_["calendar_H_target_calendar_id"]],
  [scriptProperties_["calendar_H_source_3_ics"], scriptProperties_["calendar_H_target_calendar_id"]],
  [scriptProperties_["calendar_H_source_4_ics"], scriptProperties_["calendar_H_target_calendar_id"]],
  [scriptProperties_["calendar_H_source_5_ics"], scriptProperties_["calendar_H_target_calendar_id"]],
  [scriptProperties_["calendar_H_source_6_ics"], scriptProperties_["calendar_H_target_calendar_id"]],
  [scriptProperties_["calendar_H_source_7_ics"], scriptProperties_["calendar_H_target_calendar_id"]],
  [scriptProperties_["calendar_H_source_8_ics"], scriptProperties_["calendar_H_target_calendar_id"]],
  [scriptProperties_["calendar_H_source_9_ics"], scriptProperties_["calendar_H_target_calendar_id"]],
  [scriptProperties_["calendar_I_source_1_ics"], scriptProperties_["calendar_I_target_calendar_id"]],
  [scriptProperties_["calendar_I_source_2_ics"], scriptProperties_["calendar_I_target_calendar_id"]],
  [scriptProperties_["calendar_I_source_3_ics"], scriptProperties_["calendar_I_target_calendar_id"]],
  [scriptProperties_["calendar_I_source_4_ics"], scriptProperties_["calendar_I_target_calendar_id"]],
  [scriptProperties_["calendar_I_source_5_ics"], scriptProperties_["calendar_I_target_calendar_id"]],
  [scriptProperties_["calendar_I_source_6_ics"], scriptProperties_["calendar_I_target_calendar_id"]],
  [scriptProperties_["calendar_I_source_7_ics"], scriptProperties_["calendar_I_target_calendar_id"]],
  [scriptProperties_["calendar_I_source_8_ics"], scriptProperties_["calendar_I_target_calendar_id"]],
  [scriptProperties_["calendar_I_source_9_ics"], scriptProperties_["calendar_I_target_calendar_id"]],
  [scriptProperties_["calendar_J_source_1_ics"], scriptProperties_["calendar_J_target_calendar_id"]],
  [scriptProperties_["calendar_J_source_2_ics"], scriptProperties_["calendar_J_target_calendar_id"]],
  [scriptProperties_["calendar_J_source_3_ics"], scriptProperties_["calendar_J_target_calendar_id"]],
  [scriptProperties_["calendar_J_source_4_ics"], scriptProperties_["calendar_J_target_calendar_id"]],
  [scriptProperties_["calendar_J_source_5_ics"], scriptProperties_["calendar_J_target_calendar_id"]],
  [scriptProperties_["calendar_J_source_6_ics"], scriptProperties_["calendar_J_target_calendar_id"]],
  [scriptProperties_["calendar_J_source_7_ics"], scriptProperties_["calendar_J_target_calendar_id"]],
  [scriptProperties_["calendar_J_source_8_ics"], scriptProperties_["calendar_J_target_calendar_id"]],
  [scriptProperties_["calendar_J_source_9_ics"], scriptProperties_["calendar_J_target_calendar_id"]],
];
sourceCalendars = sourceCalendars.filter(
    ([icsUrl, targetCalendarId]) => icsUrl && targetCalendarId);

var serviceAccountKeyJson_ = JSON.parse(scriptProperties_["service_account_key_json"]); // OPTIONAL: If you want to use a service account to create the calendar events, provide the JSON service account key here. If not, leave this null.

var howFrequent = 5;                      // What interval (minutes) to run this script on to check for new events.  Any integer can be used, but will be rounded up to 5, 10, 15, 30 or to the nearest hour after that.. 60, 120, etc. 1440 (24 hours) is the maximum value.  Anything above that will be replaced with 1440.
var addEventsToCalendar = true;           // If you turn this to "false", you can check the log (View > Logs) to make sure your events are being read correctly before turning this on
var modifyExistingEvents = true;          // If you turn this to "false", any event in the feed that was modified after being added to the calendar will not update
var removeEventsFromCalendar = true;      // If you turn this to "true", any event created by the script that is not found in the feed will be removed.
var removePastEventsFromCalendar = false; // If you turn this to "false", any event that is in the past will not be removed.
var addAlerts = "no";                     // Whether to add the ics/ical alerts as notifications on the Google Calendar events or revert to the calendar's default reminders ("yes", "no", "default").
var addOrganizerToTitle = false;          // Whether to prefix the event name with the event organiser for further clarity
var descriptionAsTitles = false;          // Whether to use the ics/ical descriptions as titles (true) or to use the normal titles as titles (false)
var addCalToTitle = false;                // Whether to add the source calendar to title
var addAttendees = false;                 // Whether to add the attendee list. If true, duplicate events will be automatically added to the attendees' calendar.
var defaultAllDayReminder = -1;           // Default reminder for all day events in minutes before the day of the event (-1 = no reminder, the value has to be between 0 and 40320)
                                          // See https://github.com/derekantrican/GAS-ICS-Sync/issues/75 for why this is neccessary.
var overrideVisibility = "default";       // Changes the visibility of the event ("default", "public", "private", "confidential"). Anything else will revert to the class value of the ICAL event.
var addTasks = false;

var emailSummary = false;                 // Will email you when an event is added/modified/removed to your calendar
var email = "";                           // OPTIONAL: If "emailSummary" is set to true or you want to receive update notifications, you will need to provide your email address
var customEmailSubject = "";              // OPTIONAL: If you want to change the email subject, provide a custom one here. Default: "GAS-ICS-Sync Execution Summary"
var dateFormat = "YYYY-MM-DD"             // date format in the email summary (e.g. "YYYY-MM-DD", "DD.MM.YYYY", "MM/DD/YYYY". separators are ".", "-" and "/")

/*
*=========================================
*           ABOUT THE AUTHOR
*=========================================
*
* This program was created by Derek Antrican
*
* If you would like to see other programs Derek has made, you can check out
* his website: derekantrican.com or his github: https://github.com/derekantrican
*
*=========================================
*            BUGS/FEATURES
*=========================================
*
* Please report any issues at https://github.com/derekantrican/GAS-ICS-Sync/issues
*
*=========================================
*           $$ DONATIONS $$
*=========================================
*
* If you would like to donate and support the project,
* you can do that here: https://www.paypal.me/jonasg0b1011001
*
*=========================================
*             CONTRIBUTORS
*=========================================
* Andrew Brothers
* Github: https://github.com/agentd00nut
* Twitter: @abrothers656
*
* Joel Balmer
* Github: https://github.com/JoelBalmer
*
* Blackwind
* Github: https://github.com/blackwind
*
* Jonas Geissler
* Github: https://github.com/jonas0b1011001
*/


//=====================================================================================================
//!!!!!!!!!!!!!!!! DO NOT EDIT BELOW HERE UNLESS YOU REALLY KNOW WHAT YOU'RE DOING !!!!!!!!!!!!!!!!!!!!
//=====================================================================================================

var defaultMaxRetries = 10; // Maximum number of retries for api functions (with exponential backoff)

function install() {
  // Delete any already existing triggers so we don't create excessive triggers
  deleteAllTriggers();

  // Schedule sync routine to explicitly repeat and schedule the initial sync
  var adjustedMinutes = getValidTriggerFrequency(howFrequent);
  if (adjustedMinutes >= 60) {
    ScriptApp.newTrigger("startSync")
      .timeBased()
      .everyHours(adjustedMinutes / 60)
      .create();
  } else {
    ScriptApp.newTrigger("startSync")
      .timeBased()
      .everyMinutes(adjustedMinutes)
      .create();
  }
  ScriptApp.newTrigger("startSync").timeBased().after(1000).create();

  // Schedule sync routine to look for update once per day using everyDays
  ScriptApp.newTrigger("checkForUpdate")
    .timeBased()
    .everyDays(1)
    .create();
}

function uninstall(){
  deleteAllTriggers();
}

// Per-calendar global variables (must be reset before processing each new calendar!)
var calendarEvents = [];
var calendarEventsIds = [];
var icsEventsIds = [];
var calendarEventsMD5s = [];
var recurringEvents = [];
var targetCalendarId;

// Per-session global variables (must NOT be reset before processing each new calendar!)
var addedEvents = [];
var modifiedEvents = [];
var removedEvents = [];

// Syncing logic can set this to true to cause the Google Apps Script "Executions" dashboard to report failure
var reportOverallFailure = false;

function startSync(){
  if (PropertiesService.getUserProperties().getProperty('LastRun') > 0 && (new Date().getTime() - PropertiesService.getUserProperties().getProperty('LastRun')) < 360000) {
    Logger.log("Another iteration is currently running! Exiting...");
    return;
  }

  PropertiesService.getUserProperties().setProperty('LastRun', new Date().getTime());

  //Disable email notification if no mail adress is provided
  emailSummary = emailSummary && email != "";

  sourceCalendars = condenseCalendarMap(sourceCalendars);
  for (var calendar of sourceCalendars){
    //------------------------ Reset globals ------------------------
    calendarEvents = [];
    calendarEventsIds = [];
    icsEventsIds = [];
    calendarEventsMD5s = [];
    recurringEvents = [];

    targetCalendarId = calendar[0];
    var sourceCalendarURLs = calendar[1];
    var vevents;

    //------------------------ Fetch URL items ------------------------
    var responses = fetchSourceCalendars(sourceCalendarURLs);
    Logger.log("Syncing " + responses.length + " calendars to " + targetCalendarId);

    //------------------------ Get target calendar information------------------------
    Logger.log("Working on calendar: " + targetCalendarId);

    //------------------------ Parse existing events --------------------------
    if(addEventsToCalendar || modifyExistingEvents || removeEventsFromCalendar){
      var eventList =
        callWithBackoff(function(){
            return Calendar.Events.list(targetCalendarId, {showDeleted: false, privateExtendedProperty: "fromGAS=true", maxResults: 2500});
        }, defaultMaxRetries);
      calendarEvents = [].concat(calendarEvents, eventList.items);
      //loop until we received all events
      while(typeof eventList.nextPageToken !== 'undefined'){
        eventList = callWithBackoff(function(){
          return Calendar.Events.list(targetCalendarId, {showDeleted: false, privateExtendedProperty: "fromGAS=true", maxResults: 2500, pageToken: eventList.nextPageToken});
        }, defaultMaxRetries);

        if (eventList != null)
          calendarEvents = [].concat(calendarEvents, eventList.items);
      }
      Logger.log("Fetched " + calendarEvents.length + " existing events from " + targetCalendarId);
      for (var i = 0; i < calendarEvents.length; i++){
        if (calendarEvents[i].extendedProperties != null){
          calendarEventsIds[i] = calendarEvents[i].extendedProperties.private["rec-id"] || calendarEvents[i].extendedProperties.private["id"];
          calendarEventsMD5s[i] = calendarEvents[i].extendedProperties.private["MD5"];
        }
      }

      //------------------------ Parse ical events --------------------------
      vevents = parseResponses(responses, icsEventsIds);
      Logger.log("Parsed " + vevents.length + " events from ical sources");
    }

    //------------------------ Process ical events ------------------------
    if (addEventsToCalendar || modifyExistingEvents){
      Logger.log("Processing " + vevents.length + " events");
      var calendarTz =
        callWithBackoff(function(){
          return Calendar.Settings.get("timezone").value;
        }, defaultMaxRetries);

      vevents.forEach(function(e){
        processEvent(e, calendarTz);
      });

      Logger.log("Done processing events");
    }

    //------------------------ Remove old events from calendar ------------------------
    if(removeEventsFromCalendar){
      Logger.log("Checking " + calendarEvents.length + " events for removal");
      processEventCleanup();
      Logger.log("Done checking events for removal");
    }

    //------------------------ Process Tasks ------------------------
    if (addTasks){
      processTasks(responses);
    }

    //------------------------ Add Recurring Event Instances ------------------------
    Logger.log("Processing " + recurringEvents.length + " Recurrence Instances!");
    for (var recEvent of recurringEvents){
      processEventInstance(recEvent);
    }
  }

  if ((addedEvents.length + modifiedEvents.length + removedEvents.length) > 0 && emailSummary){
    sendSummary();
  }
  Logger.log("Sync finished!");
  PropertiesService.getUserProperties().setProperty('LastRun', 0);

  if (reportOverallFailure) {
    // Cause the Google Apps Script "Executions" dashboard to show a failure
    // (the message text does not seem to be logged anywhere)
    throw new Error('The sync operation produced errors. See log for details.');
  }
}

function forceUnsafeSync() {
  PropertiesService.getUserProperties().setProperty("LastRun", 0);
  startSync();
}
