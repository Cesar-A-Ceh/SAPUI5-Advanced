sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.Filter} Filter
     * @param {typeof sap.ui.model.FilterOperator} FilterOperator
     */
    function (Controller, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("logaligroup.employees.controller.MainView", {
            onInit: function () {

                var oJSONModel = new sap.ui.model.json.JSONModel();
                var oView = this.getView();
                //var i18nBundle = oView.getModel("i18n").getResourceBundle();
                var i18nBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();

                // var oJSON = {
                //     employeeId: "12345",
                //     countryKey: "UK",
                //     listCountry: [
                //         {
                //             key: "US",
                //             text: i18nBundle.getText("CountryUS")
                //         },
                //         {
                //             key: "UK",
                //             text: i18nBundle.getText("CountryUK")
                //         },
                //         {
                //             key: "ES",
                //             text:i18nBundle.getText("CountryES")
                //         }
                //     ],
                // };
                //oJSONModel.setData(oJSON);

                oJSONModel.loadData("./localService/mockdata/Employees.json", false);
                oJSONModel.attachRequestCompleted(function (oEventModel) {
                    console.log(JSON.stringify(oJSONModel.getData()));
                });
                oView.setModel(oJSONModel);

            },

            onFilter: function () {

                var oJSON = this.getView().getModel().getData();
                var filters = [];

                debugger;
                if (oJSON.employeeId !== "" && oJSON.employeeId !== undefined) {
                    filters.push(new Filter("EmployeeID", FilterOperator.EQ, oJSON.employeeId));
                }

                debugger;
                if (oJSON.countryKey !== "" && oJSON.countryKey !== undefined) {
                    filters.push(new Filter("Country", FilterOperator.EQ, oJSON.countryKey));
                }

                var oList = this.getView().byId("tableEmployee");
                var oBinding = oList.getBinding("items");
                oBinding.filter(filters);
            },

            onClearFilter: function () {
                var oModel = this.getView().getModel();
                var filters = [];

                debugger;
                oModel.setProperty("/employeeId", "");
                oModel.setProperty("/countryKey", "");

                //var oList = this.getView().byId("tableEmployee");
                //var oBinding = oList.getBinding("items");
                //oBinding.filter(filters);
            },

            onValidate: function () {
                var inputEmployee = this.byId("inputEmployee");
                var valueEmployee = inputEmployee.getValue();

                /*if (valueEmployee.length === 6) {
                    //inputEmployee.setDescription("OK");
                    this.byId("labelCountry").setVisible(true);
                    this.byId("slCountry").setVisible(true);
                } else {
                    //inputEmployee.setDescription("Not OK");
                    this.byId("labelCountry").setVisible(false);
                    this.byId("slCountry").setVisible(false);
                }*/
            }
        });
    });
