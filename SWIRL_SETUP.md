
# Setting Up Swirl Search Engine for Lovable

This guide will help you set up the Swirl search engine to work with the Vernon chat feature in your Lovable app.

## Prerequisites

- Docker installed on your system
- Basic knowledge of terminal/command line operations

## Setup Instructions

### 1. Install and Run Swirl with Docker

```bash
# Pull the Swirl Docker image
docker pull swirlai/swirl:latest

# Run Swirl container
docker run -d -p 8000:8000 --name swirl swirlai/swirl:latest
```

This will start the Swirl search engine on port 8000.

### 2. Verify Installation

Open your browser and navigate to `http://localhost:8000/swirl/`. You should see the Swirl interface.

### 3. Configure Swirl (Optional)

For advanced configuration, you can create a configuration file and mount it to the Docker container. Refer to the [Swirl documentation](https://github.com/swirlai/swirl) for more details.

## Integration with Lovable

The Lovable app is already configured to use Swirl as a search provider for the Vernon chat feature. The integration works as follows:

1. When a user submits a query in the Vernon chat, the app checks if Swirl is available
2. If Swirl is available, it sends the query to Swirl for processing
3. Swirl performs the search and returns results
4. The app formats the results and displays them to the user
5. If Swirl is not available or returns an error, the app falls back to other search methods

## Troubleshooting

If you encounter any issues with the Swirl integration:

1. Ensure the Swirl container is running with `docker ps`
2. Check Swirl logs with `docker logs swirl`
3. Verify that your app can connect to `http://localhost:8000`
4. Look for any error messages in the browser console

## Custom Configuration

You can modify the Swirl configuration in `src/services/SwirlSearchService.ts` to change:

- The base URL if you're hosting Swirl on a different server
- The formatting of search results
- Search parameters and behavior

## References

- [Swirl GitHub Repository](https://github.com/swirlai/swirl)
- [Swirl Documentation](https://docs.swirl.today/)
