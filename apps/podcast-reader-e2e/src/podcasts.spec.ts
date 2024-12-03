import { test, expect } from '@playwright/test';

test('has the joe budden content and get the episode', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await expect(page.getByText('The Joe Budden PodcastAuthor')).toBeVisible();
  await page.getByPlaceholder('Filter podcasts...').click();
  await page.getByPlaceholder('Filter podcasts...').fill('joe');
  await expect(page.getByText('The Joe Budden PodcastAuthor')).toBeVisible();
  await page.getByTestId('podcast-card').click();
  await page.getByRole('link', { name: 'The Joe Budden Podcast' }).click();
  await page
    .getByRole('link', { name: 'Episode 778 | "Bottom Of The' })
    .click();
  await page.getByText('Episode 778 | "Bottom Of The').click();
  await page.getByLabel('Página de inicio').click();
  await expect(page.getByText('The Joe Budden PodcastAuthor')).toBeVisible();
});
