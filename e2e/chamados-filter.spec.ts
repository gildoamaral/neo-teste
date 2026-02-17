import { test, expect } from "@playwright/test";

test.describe("Chamados – filtro e ordenação", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/chamados");
    await page.waitForSelector(".ant-table-tbody tr.ant-table-row", {
      timeout: 15_000,
    });
  });

  test("deve filtrar chamados por status e exibir apenas resultados correspondentes", async ({
    page,
  }) => {
    const initialRows = await page
      .locator(".ant-table-tbody tr.ant-table-row")
      .count();
    expect(initialRows).toBeGreaterThan(0);

    await page
      .locator(".ant-select")
      .filter({ hasText: /Status/ })
      .first()
      .click();
    await page.waitForSelector(".ant-select-dropdown", { state: "visible" });

    await page
      .locator(".ant-select-dropdown .ant-select-item-option")
      .filter({ hasText: "Aberto" })
      .click();

    await page.waitForTimeout(1_000);
    await page.waitForSelector(".ant-table-tbody tr.ant-table-row", {
      timeout: 10_000,
    });

    await expect(page.locator("text=Status:")).toBeVisible();
    await expect(
      page.locator("strong", { hasText: "Aberto" }).first(),
    ).toBeVisible();

    const statusCells = page.locator(
      ".ant-table-tbody tr.ant-table-row td:nth-child(5)",
    );
    const count = await statusCells.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const text = await statusCells.nth(i).innerText();
      expect(text).toBe("Aberto");
    }
  });

  test("deve ordenar chamados por prioridade ao clicar no cabeçalho", async ({
    page,
  }) => {
    await page.locator("th").filter({ hasText: "PRIORIDADE" }).click();

    await page.waitForTimeout(1_000);
    await page.waitForSelector(".ant-table-tbody tr.ant-table-row", {
      timeout: 10_000,
    });

    const PRIORITY_WEIGHT: Record<string, number> = {
      Crítica: 0,
      Alta: 1,
      Média: 2,
      Baixa: 3,
    };

    const priorityCells = page.locator(
      ".ant-table-tbody tr.ant-table-row td:nth-child(4)",
    );
    const cellCount = await priorityCells.count();
    expect(cellCount).toBeGreaterThan(0);

    const priorities: number[] = [];
    for (let i = 0; i < cellCount; i++) {
      const text = (await priorityCells.nth(i).innerText()).trim();
      const clean = text.replace(/^⚠\s*/, "");
      const weight = PRIORITY_WEIGHT[clean];
      expect(weight).toBeDefined();
      priorities.push(weight);
    }

    const isAscending = priorities.every(
      (v, i) => i === 0 || v >= priorities[i - 1],
    );
    const isDescending = priorities.every(
      (v, i) => i === 0 || v <= priorities[i - 1],
    );

    expect(isAscending || isDescending).toBe(true);
  });

  test("deve limpar filtros ao clicar em Limpar", async ({ page }) => {
    await page
      .locator(".ant-select")
      .filter({ hasText: /Área/ })
      .first()
      .click();
    await page.waitForSelector(".ant-select-dropdown", { state: "visible" });
    await page
      .locator(".ant-select-dropdown .ant-select-item-option")
      .filter({ hasText: "Energia" })
      .click();

    await page.waitForTimeout(1_000);
    await expect(page.locator("text=Área:")).toBeVisible();

    await page.getByRole("button", { name: "Limpar" }).click();

    await page.waitForTimeout(1_000);

    await expect(page.locator("text=Nenhum filtro ativo")).toBeVisible();
  });
});
