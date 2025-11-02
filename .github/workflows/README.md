# GitHub Actions Workflows

This directory contains GitHub Actions workflows for CI/CD, security scanning, and automated tasks.

## 📋 Available Workflows

### 1. CI (`ci.yml`)

Main continuous integration workflow that runs on every push and pull request.

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

**Jobs:**
- **Lint**: Runs ESLint on all packages
- **Type Check**: Validates TypeScript types across the monorepo
- **Test**: Runs all test suites and uploads coverage reports
- **Build**: Builds all packages using Turborepo with caching
- **Format Check**: Verifies code formatting with Prettier

**Features:**
- Automatic pnpm and Node.js setup
- Dependency caching for faster builds
- Turborepo cache support
- Build artifacts upload
- Optional Codecov integration

**Secrets Required (Optional):**
- `CODECOV_TOKEN`: For uploading test coverage reports
- `TURBO_TOKEN`: For Turborepo remote caching
- `TURBO_TEAM`: Your Turborepo team name

### 2. Docker Build (`docker-build.yml`)

Builds and optionally pushes Docker images for backend and frontend.

**Triggers:**
- Push to `main` branch
- Push of tags matching `v*`
- Pull requests to `main` (build only, no push)
- Manual workflow dispatch

**Features:**
- Multi-platform Docker builds
- Image caching for faster builds
- Automatic tagging based on branch, PR, or semver tags
- Support for Docker Hub or other registries

**Secrets Required:**
- `DOCKER_USERNAME`: Docker registry username
- `DOCKER_PASSWORD`: Docker registry password/token
- `DOCKER_REGISTRY`: Docker registry URL (e.g., `docker.io`, `ghcr.io`, or your private registry)

### 3. CodeQL Analysis (`codeql.yml`)

Security scanning workflow using GitHub's CodeQL.

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches
- Weekly schedule (Mondays at 2 AM UTC)

**Features:**
- Automated security vulnerability scanning
- Supports JavaScript and TypeScript
- Results appear in GitHub Security tab

### 4. Release (`release.yml`)

Creates GitHub releases with build artifacts.

**Triggers:**
- Push of tags matching `v*.*.*`
- Push to `main` branch
- Manual workflow dispatch

**Features:**
- Automatic release notes generation
- Build artifact uploads
- Supports semantic versioning

**Permissions Required:**
- `contents: write` (already configured in workflow)

### 5. Dependabot Auto-merge (`dependabot-auto-merge.yml`)

Automatically merges Dependabot PRs for minor and patch updates.

**Triggers:**
- Pull requests opened by Dependabot

**Features:**
- Auto-merges minor and patch updates
- Helps keep dependencies up to date

## 🔧 Configuration

### Required Secrets

Add these secrets in your GitHub repository settings (`Settings > Secrets and variables > Actions`):

#### CI/CD Secrets

1. **CODECOV_TOKEN** (optional)
   - Token from Codecov for coverage reports
   - Get it from: https://codecov.io

2. **TURBO_TOKEN** (optional)
   - Token for Turborepo remote caching
   - Get it from: https://vercel.com/docs/monorepos/caching

3. **TURBO_TEAM** (optional)
   - Your Turborepo team name
   - Required if using Turborepo remote cache

#### Docker Secrets

1. **DOCKER_USERNAME**
   - Your Docker registry username

2. **DOCKER_PASSWORD**
   - Your Docker registry password or token

3. **DOCKER_REGISTRY** (optional, defaults to Docker Hub)
   - Registry URL (e.g., `docker.io`, `ghcr.io`, `your-registry.com`)

### Dependabot Configuration

The `.github/dependabot.yml` file configures automatic dependency updates for:
- npm/pnpm packages
- GitHub Actions
- Docker images

Dependabot will:
- Check weekly (Mondays at 2 AM UTC)
- Open up to 10 PRs at a time
- Ignore major version updates
- Auto-label PRs appropriately

## 🚀 Usage

### Running Workflows Manually

1. Go to your repository on GitHub
2. Click on the "Actions" tab
3. Select the workflow you want to run
4. Click "Run workflow"

### Viewing Workflow Results

1. Go to the "Actions" tab in your repository
2. Click on a workflow run to see detailed logs
3. Check individual job statuses and outputs

### Downloading Artifacts

Build artifacts are automatically uploaded and can be downloaded:
1. Go to a completed workflow run
2. Scroll to the "Artifacts" section
3. Click to download build outputs

## 📝 Customization

### Adjusting Node.js Version

Edit the `node-version` in workflow files:
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'  # Change this
```

### Adjusting pnpm Version

Edit the `version` in workflow files:
```yaml
- name: Setup pnpm
  uses: pnpm/action-setup@v4
  with:
    version: 8.15.0  # Change this
```

### Changing Trigger Branches

Modify the `on.push.branches` and `on.pull_request.branches` sections:
```yaml
on:
  push:
    branches: [main, develop]  # Add/remove branches
```

## 🐛 Troubleshooting

### Workflow Fails on Dependency Installation

- Ensure `pnpm-lock.yaml` is committed
- Check that all package.json files are valid
- Verify pnpm version compatibility

### Docker Build Fails

- Check Docker secrets are correctly set
- Verify Dockerfile paths are correct
- Ensure Docker registry is accessible

### Tests Timeout

- Increase `timeout-minutes` in the test job
- Check for hanging tests or infinite loops
- Review test execution time

### Cache Not Working

- Clear caches in GitHub Actions (Settings > Actions > Caches)
- Verify cache key patterns match your setup
- Check Turborepo cache configuration

## 📚 Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [pnpm Documentation](https://pnpm.io/)
- [Docker Buildx Documentation](https://docs.docker.com/build/buildx/)

