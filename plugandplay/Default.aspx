<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="plugandplay.Default" %>

<asp:Content ID="Content2" ContentPlaceHolderID="mainContent" runat="Server">

    <div ng-app="app" ng-strict-di ng-cloak>
        <div class="row pad-a-2" ng-show="!siteIsLoading">
            <div class="col-lg-12 text-center">
                <div class="spinner"></div>
            </div>
        </div>
        <ui-view></ui-view>
    </div>

</asp:Content>
