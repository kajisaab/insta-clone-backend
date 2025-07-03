# Kafka Testing Guide

## Overview

This guide explains how to run Kafka tests with a real Kafka instance. The tests are designed to work in two modes:

1. **Simulation Mode (Default)**: Tests run without requiring a real Kafka instance
2. **Real Kafka Mode**: Tests connect to a real Kafka instance for actual message production and consumption

## Running Tests with a Real Kafka Instance

To run tests with a real Kafka instance:

1. Make sure you have a Kafka instance running locally (typically on ports 9092, 9093)

2. Set the environment variable `KAFKA_TEST_REAL=true` when running the tests:

    ```bash
    # Run a specific Kafka test with real Kafka connection
    KAFKA_TEST_REAL=true npm test -- test/core/kafka/kafka.test.ts

    # Or for all tests
    KAFKA_TEST_REAL=true npm test
    ```

## Test Configuration

The Kafka tests use the following environment variables:

-   `NODE_ENV=test`: Indicates test environment
-   `KAFKA_TEST_REAL=true`: Enables real Kafka connections during tests
-   `KAFKA_BROKER`: Comma-separated list of Kafka brokers (default: localhost:9092,localhost:9093)

## Troubleshooting

If the tests fail with connection errors:

1. Verify that Kafka is running and accessible on the specified ports
2. Check that no firewall is blocking the connection
3. Ensure the Kafka topics can be created and accessed by the test user
