removeWidget = false;

function RemoveWidget() {
    removeWidget = !removeWidget;
    document.querySelector(".remove").classList.toggle("on");
}

function OpenEditor() {
    document.querySelector(".settings").classList.toggle("on");
    document.querySelector(".editor").classList.toggle("on");

    Grid.engine.nodes.forEach((node) => {
        Grid.update(node.el, {
            noResize: false,
            noMove: false,
        })
    });
}

function SaveWidgets() {
    let widgets = [];
    Grid.engine.nodes.forEach((node) => {
        widgets.push({
            x: node.x,
            y: node.y,
            w: node.w,
            h: node.h,
            minH: node.minH,
            maxH: node.maxH,
            minW: node.minW,
            maxW: node.maxW,
            noResize: true,
            noMove: true,
            content: node.content.toString(),
        });
    });

    $.ajax({
        url: '/api/widgets',
        type: 'POST',
        data: {
            id: (new URL(window.location.href).searchParams.get("id")),
            widgets: JSON.stringify(widgets)
        },
        success: function (response) {
            document.querySelector(".editor").classList.toggle("on");
            document.querySelector(".settings").classList.toggle("on");
            document.querySelector(".remove").classList.remove("on");

            Grid.engine.nodes.forEach((node) => {
                Grid.update(node.el, {
                    noResize: true,
                    noMove: true,
                })
            });

        },
        error: function (error) {
            console.log(error);
        }
    });
}

function WidgetDashboard() {
    document.querySelector(".remove").classList.remove("on");

    let overlay = document.getElementById("overlay");

    let popup = document.createElement("div");
    popup.id = "popup";

    title = document.createElement("div");
    title.className = "title";
    title.innerText = "Select a widget";

    popup.appendChild(title);
    overlay.appendChild(popup);
    overlay.style.display = "grid";

    let widgetList = document.createElement("div");
    widgetList.id = "widgetList";

    widgetList.appendChild(MakeWidget("https://cdn-icons-png.flaticon.com/512/2784/2784459.png", "Analog Clock", "AddWidget('Analog')"));
    widgetList.appendChild(MakeWidget("https://cdn-icons-png.flaticon.com/512/2994/2994853.png", "Digital Clock", "AddWidget('Digital')"));

    popup.appendChild(widgetList);
}

async function AddWidget(type) {
    let overlay = document.getElementById("overlay");
    let popup = document.getElementById("popup");

    overlay.style.display = "none";
    overlay.removeChild(popup);

    Grid.addWidget({
        minH: 1,
        maxH: 12,
        minW: 1,
        maxW: 12,
        w: 1,
        h: 1,
        noResize: false,
        noMove: false,
        content: GenerateWidget(type)
    });
}

function GenerateWidget(type) {
    let content = document.createElement("div");
    content.classList.add("widget");
    content.innerHTML = Widgets[type]();
    let widget_overlay = document.createElement("div");
    widget_overlay.classList.add("widget_overlay");
    content.appendChild(widget_overlay);

    return content.outerHTML;
}

function MakeWidget(image, title, callback) {
    let widget = document.createElement("div");
    widget.className = "card";
    let widget_icon = document.createElement("div");
    widget_icon.className = "icon";
    widget_icon.style.backgroundImage = `url('${image}')`;
    widget.appendChild(widget_icon);
    let widget_title = document.createElement("div");
    widget_title.className = "title";
    widget_title.innerText = title;
    widget.appendChild(widget_title);
    let widget_button = document.createElement("div");
    widget_button.className = "btn";
    widget_button.innerText = "Add";
    widget_button.setAttribute("onclick", callback);
    widget.appendChild(widget_button);

    return widget;
}

document.querySelectorAll(".grid-stack-item-content").forEach((widget) => {
    widget.addEventListener("click", () => {
        if (removeWidget) {
            Grid.removeWidget(widget);
        }
    });
});

Grid.on("added", (event, items) => {
    items.forEach((item) => {
        item.el.addEventListener("click", () => {
            if (removeWidget) {
                Grid.removeWidget(item.el);
            }
        });
    });
});