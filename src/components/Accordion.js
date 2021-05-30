import React from "react";
export const AccordionCom = ({ items }) => {
  const renderedItems = items.map((item, idx) => {
    return (
      <div
        class="card my-2"
        data-toggle="collapse"
        data-target={"#quiz" + idx}
        aria-expanded="false"
      >
        <div class="card-header border-0" id="headingOne">
          <h5 class="mb-0">{item.title}</h5>
        </div>

        <div id={"quiz" + idx} class="collapse" data-parent="#accordion">
          <div class="card-body">{item.content}</div>
        </div>
      </div>
    );
  });
  return <div id="accordion">{renderedItems}</div>;
};
