const { ipcRenderer } = require("electron");
const { EventEmitter } = require("events");
const LicenseActivationDialog = require("../dialogs/license-activation-dialog");

class LicenseStore extends EventEmitter {
  constructor() {
    super();
    this.licenseStatus = {
      activated: false,
      name: null,
      product: null,
      edition: null,
      productDisplayName: null,
      deviceId: null,
      licenseKey: null,
      activationCode: null,
      trial: false,
      trialDaysLeft: 0,
    };
  }

  async fetch() {
    this.licenseStatus = {
      activated: true,
      name: "Bypassed User",
      product: "StarUML",
      edition: "Ultimate",
      productDisplayName: "StarUML Ultimate",
      deviceId: "bypassed-device-id",
      licenseKey: "BYPASSED-KEY",
      activationCode: "BYPASSED-ACTIVATION",
      trial: false,
      trialDaysLeft: 999,
    };
    this.emit("statusChanged", this.licenseStatus);
  }

  async getDeviceId() {
    return "bypassed-device-id";
  }

  async activate(licenseKey) {
    this.licenseStatus.activated = true;
    this.licenseStatus.licenseKey = licenseKey || "BYPASSED-KEY";
    this.emit("statusChanged", this.licenseStatus);
    return { success: true, message: "Activation bypassed" };
  }

  async deactivate() {
    this.licenseStatus.activated = false;
    this.emit("statusChanged", this.licenseStatus);
    return { success: true, message: "Deactivation bypassed" };
  }

  async validate() {
    this.licenseStatus.activated = true;
    return { success: true, message: "Validation bypassed" };
  }

  getLicenseStatus() {
    return this.licenseStatus;
  }

  async checkTrialMode() {
    return;
  }

  async htmlReady() {
    await this.fetch();
    await this.checkTrialMode();
    await this.fetch();
  }
}

module.exports = LicenseStore;
