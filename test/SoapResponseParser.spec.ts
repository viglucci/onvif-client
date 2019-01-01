import 'mocha';
import { expect } from 'chai';
import ResponseParser from '../src/soap/ResponseParser';
import XMLMockReader from './util/XMLMockReader';

const getDeviceInformationResponseSuccess = XMLMockReader.readFile('./test/mocks/GetDeviceInformationResponseSuccess.xml');
const getCapabilitiesResponseSuccess = XMLMockReader.readFile('./test/mocks/GetCapabilitiesResponseSuccess.xml');

describe.only('ResponseParser', () => {

  describe('parse', () => {

    it('parses a response with a simple body single level', async () => {
      const { getDeviceInformationResponse } = await ResponseParser.parse(getDeviceInformationResponseSuccess);
      expect(getDeviceInformationResponse.manufacturer).to.equal('VENDOR');
      expect(getDeviceInformationResponse.model).to.equal('VENDOR MODEL');
      expect(getDeviceInformationResponse.firmwareVersion).to.equal(5.2);
      expect(getDeviceInformationResponse.serialNumber).to.equal('00408C1836B2');
      expect(getDeviceInformationResponse.hardwareId).to.equal(170);
    });

    it('parses a response with a complex multi-level body', async () => {
      const { getCapabilitiesResponse } = await ResponseParser.parse(getCapabilitiesResponseSuccess);
      const expected = {
          "capabilities": {
              "device": {
                  "XAddr": "http://169.254.76.145/onvif/services",
                  "network": {
                      "IPFilter": true,
                      "zeroConfiguration": true,
                      "IPVersion6": true,
                      "dynDNS": true
                  },
                  "system": {
                      "discoveryResolve": true,
                      "discoveryBye": true,
                      "remoteDiscovery": false,
                      "systemBackup": false,
                      "systemLogging": true,
                      "firmwareUpgrade": false,
                      "supportedVersions": {
                          "major": 1,
                          "minor": 0
                      }
                  },
                  "IO": {
                      "inputConnectors": 1,
                      "relayOutputs": 0
                  },
                  "security": {
                      "TLS1.1": false,
                      "TLS1.2": false,
                      "onboardKeyGeneration": false,
                      "accessPolicyConfig": false,
                      "X.509Token": false,
                      "SAMLToken": false,
                      "kerberosToken": false,
                      "RELToken": false
                  }
              },
              "events": {
                  "XAddr": "http://169.254.76.145/onvif/services",
                  "WSSubscriptionPolicySupport": false,
                  "WSPullPointSupport": false,
                  "WSPausableSubscriptionManagerInterfaceSupport": false
              },
              "media": {
                  "XAddr": "http://169.254.76.145/onvif/services",
                  "streamingCapabilities": {
                      "RTPMulticast": true,
                      "RTP_TCP": true,
                      "RTP_RTSP_TCP": true
                  }
              }
          }
      };
      expect(getCapabilitiesResponse).to.deep.equal(expected);
    });
  });
});
