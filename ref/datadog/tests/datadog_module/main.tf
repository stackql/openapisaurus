# Configure the Datadog provider
provider "datadog" {
  api_key = "your_datadog_api_key"
  app_key = "your_datadog_app_key"
}

# AWS integration with Datadog
resource "datadog_integration_aws" "main" {
  account_id = "your_aws_account_id"
  role_name  = "DatadogAWSIntegrationRole"
}

# A simple dashboard with an AWS EC2 CPU metric
resource "datadog_dashboard" "basic_dashboard" {
  title       = "EC2 CPU Metrics"
  description = "Dashboard for monitoring EC2 CPU usage"
  layout_type = "ordered"

  widget {
    timeseries_definition {
      request {
        q = "avg:aws.ec2.cpuutilization{$host}"
      }
      display_type = "line"
      title        = "Average EC2 CPU Utilization"
    }
  }
}

# CPU Monitor
resource "datadog_monitor" "cpu_monitor" {
  name    = "High CPU Usage"
  type    = "metric alert"
  query   = "avg(last_5m):avg:aws.ec2.cpuutilization{your_instance_tag} > 80"
  message = "CPU usage is over 80% for the last 5 minutes."

  thresholds {
    critical = 80.0
    warning  = 70.0
  }

  notify_no_data    = false
  renotify_interval = 0
}
