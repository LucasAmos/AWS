#!/bin/bash
cp -r public/. .next/standalone/public
cp -r .next/static/. .next/standalone/.next/static
cp run.sh .next/standalone/run.sh