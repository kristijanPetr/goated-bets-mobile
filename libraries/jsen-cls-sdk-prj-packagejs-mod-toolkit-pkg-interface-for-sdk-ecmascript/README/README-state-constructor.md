// @assign
const $gJConstructorArguments = {
  "kSType": "J",
  "kSRequired": "1",
  "kJKeys": {
    ...$xCJSENModInterfaceClsState.pJConstructorArguments['kJKeys'],
    "$aHStateConfigureJSENDOMs": {
      "kSType": "J",
      "kSRequired": "1",
      "kVKeyF": {
        "kSType": "S",
        "kRFormat": "^[a-z0-9_]{1,32}$",
        "kSBytes": "",
        "kSNormalization": "",
        "kSLowerCase": "0",
        "kSRequired": "1"
      },
      "kSMinN": "",
      "kSMaxN": "",
      "kVEach": {
        "kSType": "J",
        "kSRequired": "1",
        "kJKeys": {
          "kSComponentModule": {
            "kSType": "S",
            "kRFormat": "",
            "kSBytes": "",
            "kSNormalization": "",
            "kSLowerCase": "0",
            "kSRequired": "1"
          },
          "kSLoaderComponentModule": {
            "kSType": "S",
            "kRFormat": "",
            "kSBytes": "",
            "kSNormalization": "",
            "kSLowerCase": "0",
            "kSRequired": "1"
          },
          "kSLoaderTransitionDuration": {
            "kSType": "S",
            "kRFormat": "((^$)|(^(([0-9]{1})|([1-9]{1}[0-9]+))$))",
            "kSBytes": "",
            "kSNormalization": "",
            "kSLowerCase": "0",
            "kSRequired": "1"
          },
          "kHContractContextComponents": {
            "kSType": "J",
            "kSRequired": "1",
            "kVKeyF": [{
              "kSType": "S",
              "kRFormat": "^(\\*)$",
              "kSBytes": "",
              "kSNormalization": "",
              "kSLowerCase": "0",
              "kSRequired": "1"
            },{
              "kSType": "S",
              "kRFormat": "^(\\$dom:none)$",
              "kSBytes": "",
              "kSNormalization": "",
              "kSLowerCase": "0",
              "kSRequired": "1"
            },{
              "kSType": "S",
              "kRFormat": "^(\\$dom:root(\\.(DELETE|GET|PATCH|POST|PUT)(\\:\\/[a-z0-9_]{1,32})?)?)$",
              "kSBytes": "",
              "kSNormalization": "",
              "kSLowerCase": "0",
              "kSRequired": "1"
            },{
              "kSType": "S",
              "kRFormat": "^(\\$dom:(list|item)\\/(([a-z0-9_]{1,32}\\.[a-z0-9_]{1,32})(\\,[a-z0-9_]{1,32}\\.[a-z0-9_]{1,32})*))$",
              "kSBytes": "",
              "kSNormalization": "",
              "kSLowerCase": "0",
              "kSRequired": "1"
            },{
              "kSType": "S",
              "kRFormat": "^(\\$dom:(list|item)(\\.(DELETE|GET|PATCH|POST|PUT)\\:)\\/(([a-z0-9_]{1,32}\\.[a-z0-9_]{1,32})(\\,[a-z0-9_]{1,32}\\.[a-z0-9_]{1,32})*)(\\/[a-z0-9_]{1,32})?)$",
              "kSBytes": "",
              "kSNormalization": "",
              "kSLowerCase": "0",
              "kSRequired": "1"
            }],
            "kSMinN": "",
            "kSMaxN": "",
            "kVEach": {
              "kSType": "S",
              "kRFormat": "^.+$",
              "kSBytes": "",
              "kSNormalization": "",
              "kSLowerCase": "0",
              "kSRequired": "1"
            }
          }
        }
      }
    }
  }
};
