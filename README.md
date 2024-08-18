# GAS-ICS-Sync

Apps Script project to sync ICS/iCal calendars to one or more Google calendars. Unlike Google Calendar's native ICS import, this can sync up to every 5 minutes, and can merge multiple ICS calendars into one Google calendar.

Forked from https://github.com/derekantrican/GAS-ICS-Sync.

Main changes:
-   This version is intended to be installed via [clasp](https://github.com/google/clasp) (which will rename *.js to *.gs when pushing).
-   Reduced `oauthScopes` to minimize permissions (removed `"https://www.googleapis.com/auth/tasks"` and `"https://www.googleapis.com/auth/script.send_mail"` that I don't use).
-   Updated a few defaults:
    -   `howFrequent` from `15` to `5` minutes
    -   `removePastEventsFromCalendar` from `true` to `false`
    -   `addAlerts` from `"yes"` to `"no"`
    -   `overrideVisibility` from `""` to `"default"`

## Setup instructions

1.  [Install clasp](https://github.com/google/clasp#install).
2.  Enable the Google Apps Script API in https://script.google.com/home/usersettings.
3.  Run `clasp login`.
4.  Either:

    1)  Create a new Script project with `clasp create --type standalone "GAS ICS Sync"` (name doesn't matter);

    Or:

    2)  Link this repository to your existing Script project (replace `YOUR_SCRIPT_ID_HERE`) using:
        ```sh
        echo "{\"scriptId\":\"YOUR_SCRIPT_ID_HERE\",\"rootDir\":\".\"}" > .clasp.json
        ```
5.  Change lines 25-53 of `Code.js` to be the settings that you want to use.
6.  Run `clasp push` to upload the scripts from this git repository to your Script project.
7.  Run `clasp open` to open the Script project.
8.  Add any necessary Script Properties (e.g. for `sourceCalendars`) in Project Settings.
9.  Go back to the Apps Script Editor and follow the installation instructions in `Code.gs` starting from step "3) Install:". See also the uninstallation instructions there if necessary later.
