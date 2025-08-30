import { useEffect, useRef } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";
import dayjs from "dayjs";
import Sidebar from "../../SlideBar/SlideBar";
import Navbar from "../../Navbar/Nav";
import "./Addeditem.css";

const Added_Items = () => {
  const tableRef = useRef(null);

  const rowMenu = [
    {
      label: "<i class='lucide lucide-pencil'></i> Change Description",
      action: (_e, row) => row.update({ description: "Updated Description" }),
    },
    {
      label: "<i class='lucide lucide-check-square'></i> Select Row",
      action: (_e, row) => row.select(),
    },
    { separator: true },
    {
      label: "Admin Functions",
      menu: [
        {
          label: "<i class='lucide lucide-trash-2'></i> Delete Row",
          action: (_e, row) => row.delete(),
        },
        {
          label: "<i class='lucide lucide-ban'></i> Disabled Option",
          disabled: true,
        },
      ],
    },
  ];

  const headerMenu = function () {
    const menu = [];
    this.getColumns().forEach((column) => {
      const container = document.createElement("div");
      container.className = "column-toggle";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = column.isVisible();
      checkbox.readOnly = true;
      checkbox.className = "column-checkbox";

      const label = document.createElement("span");
      label.textContent = column.getDefinition().title;

      container.appendChild(checkbox);
      container.appendChild(label);

      container.addEventListener("click", (e) => {
        e.stopPropagation();
        column.toggle();
        checkbox.checked = column.isVisible();
      });

      menu.push({ label: container });
    });
    return menu;
  };

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("items")) || [];

    const table = new Tabulator(tableRef.current, {
      height: "auto",
      layout: "fitColumns",
      selectable: 1,
      rowContextMenu: rowMenu,
      data: items, // ✅ Now pulling data from localStorage
      columns: [
        { title: "Item Name", field: "itemName", headerMenu },
        { title: "Item Code", field: "itemCode", headerMenu },
        { title: "Brand", field: "brand", headerMenu },
        { title: "Category", field: "category", headerMenu },
        { title: "Sub Category", field: "subCategory", headerMenu },
        { title: "UOM", field: "uom", headerMenu },
        { title: "Opening Stock", field: "openingStock", hozAlign: "right", headerMenu },
        { title: "Unit Price", field: "unitPrice", hozAlign: "right", headerMenu },
        { title: "Opening Stock Date", field: "openingStockDate", headerMenu },
        {
          title: "Status",
          headerMenu,
          formatter: (cell) => {
            const { openingStockDate } = cell.getRow().getData();
            const days = dayjs().diff(dayjs(openingStockDate), "day");

            let label, classes;
            if (days > 365) {
              label = "Old";
              classes = "status expired";
            } else if (days > 180) {
              label = "Mid Age";
              classes = "status warning";
            } else {
              label = "New";
              classes = "status valid";
            }

            return `<span class="${classes}">${label}</span>`;
          },
        },
        {
          title: "Action",
          headerSort: false,
          formatter: () => `
            <div class="table-action-buttons">
              <button class="edit-btn"><i class="lucide lucide-pencil"></i></button>
              <button class="delete-btn"><i class="lucide lucide-trash-2"></i></button>
            </div>
          `,
          cellClick: (e, cell) => {
            const row = cell.getRow();
            if (e.target.closest(".edit-btn")) {
              alert(`Edit:\n${JSON.stringify(row.getData(), null, 2)}`);
            } else if (e.target.closest(".delete-btn")) {
              row.delete();
            }
          },
        },
      ],
    });

    return () => table.destroy();
  }, []);

  return (
    <div className="added-wrapper">
      <Sidebar />
      <div className="added-content">
        <Navbar />
        <div className="added-main">
          <h1 className="page-title">Added Items</h1>
          <div ref={tableRef} className="table-container"></div>
        </div>
      </div>
    </div>
  );
};

export default Added_Items;