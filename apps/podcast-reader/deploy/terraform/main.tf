terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "6.12.0"
    }
  }
}
provider "google" {
  # Configuration options
  project = var.project
}


resource "google_storage_bucket" "bucket" {
  name     = "${var.app_name}-cf-bucket"
  location = var.location
  uniform_bucket_level_access = true
}

resource "google_storage_bucket_object" "init_object" {
  name   = "function-source.zip"
  bucket = google_storage_bucket.bucket.name
  source = "function-source.zip"  # Add path to the init zipped function source code
}

resource "google_cloudfunctions2_function" "function" {
  name = "${var.app_name}"
  location = var.location


  build_config {
    runtime = "nodejs22"
    entry_point = "handleHTTP"  # Set the entry point
    source {
      storage_source {
        bucket = google_storage_bucket.bucket.name
        object = google_storage_bucket_object.init_object.name
      }
    }
  }

  service_config {
    max_instance_count  = 1
    available_memory    = "256M"
    timeout_seconds     = 60
    ingress_settings    = "ALLOW_ALL"
  }
}

resource "google_cloudfunctions2_function_iam_binding" "allow_all" {
  project = var.project
  location = var.location
  cloud_function = google_cloudfunctions2_function.function.name
  role    = "roles/cloudfunctions.invoker"
  members        = ["allUsers"]
}









/*
resource "google_storage_bucket" "bucket_web_csr" {
  name          = "podcast-app2"
  location      = "europe-southwest1"
  force_destroy = true

  uniform_bucket_level_access = true

  website {
    main_page_suffix = "index.html"
    not_found_page   = "index.html"
  }
  cors {
    origin          = ["*"]
    method          = ["GET", "HEAD", "PUT", "POST", "DELETE"]
    response_header = ["*"]
    max_age_seconds = 3600
  }
}

# IAM to give access
resource "google_storage_bucket_iam_binding" "iam_bucket" {
  bucket = google_storage_bucket.bucket_web_csr.name
  role   = "roles/storage.objectViewer"

  members = ["allUsers"]
}
*/

