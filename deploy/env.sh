#!/usr/bin/env bash

get_var() {
    local name="$1"
    curl -s -H "Metadata-Flavor: Google" "http://metadata.google.internal/computeMetadata/v1/instance/attributes/${name}"
}
export REACT_APP_BASE_URL="$(get_var "REACT_APP_BASE_URL")"
