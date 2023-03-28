function Widget(type, settings, theming = null) {
    if (theming == null) {
        theming = {
            theme: "default",
            style: "",
        }
    }
    settingsString = "";
    for (const [key, value] of Object.entries(settings)) {
        settingsString += `${key}=${value}&`;
    }
    themeString = "";
    for (const [key, value] of Object.entries(theming)) {
        themeString += `${key}=${value}&`;
    }
    return Widgets[type](settingsString, themeString);
}


const Widgets = {
    Crypto: (settings, theming) => {
        return `
            <iframe src="/widgets/crypto?${settings}${theming}" frameborder="0" scrolling="no" style="width: 100%; height: 100%;">
            </iframe>
        `
    },
    Weather: (settings, theming) => {
        return `
            <iframe src="/widgets/weather?${settings}${theming}" frameborder="0" scrolling="no" style="width: 100%; height: 100%;">
            </iframe>
        `
    },
    Digital: (settings, theming) => {
        return `
            <iframe src="/widgets/digital?${settings}${theming}" frameborder="0" scrolling="no" style="width: 100%; height: 100%;">
            </iframe>
        `

    },
    Analog: (settings, theming) => {
        return `
            <iframe src="/widgets/analog?${settings}${theming}" frameborder="0" scrolling="no" style="width: 100%; height: 100%;">
            </iframe>
        `
    }
}

Defaults = {
    Crypto: {
        coin: "BTC",
    },
    Weather: {
        loc: "New York",
    },
    Digital: {
        tz: "America/New_York",
    },
    Analog: {
        tz: "America/New_York",
    }
}

var Grid = GridStack.init({
    cellHeight: "auto",
    row: 6,
    column: 12
});

function LoadWidgets() {
    $.ajax({
        url: "/api/widgets?id=" + (new URL(window.location.href).searchParams.get("id")),
        type: "GET",
        success: function (data) {
            Grid.load(data);
        },
        error: function (error) {
            console.log(error);
        }
    });
}