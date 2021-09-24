describe("app works correctly with routes", function () {
    before(function () {
        cy.visit("http://localhost:3000");
    });

    it("доступность сайта localhost:3000", function () {
        cy.visit("http://localhost:3000");
    });

    it("сборка и отправка заказа, без регистрации", function () {
        // переносим ингредиенты        
        cy.wait(1000);
        cy.get("[test-class=dnd-bun]").first().trigger("dragstart").trigger("dragleave");
        cy.get("[test-class=dnd-end]").as("dnd_end");
        cy.get("@dnd_end").trigger("dragenter").trigger("dragover").trigger("drop").trigger("dragend");
        cy.wait(1000);
        cy.get("[test-class=dnd-sauce]").first().trigger("dragstart").trigger("dragleave");
        cy.get("@dnd_end").trigger("dragenter").trigger("dragover").trigger("drop").trigger("dragend");
        cy.wait(500);
        cy.get("[test-class=dnd-sauce]").last().trigger("dragstart").trigger("dragleave");
        cy.get("@dnd_end").trigger("dragenter").trigger("dragover").trigger("drop").trigger("dragend");
        cy.wait(1000);
        // Пытаемся отправить
        cy.get("button").contains("Оформить заказ").click();
        // попадаем на форму входа
        cy.get("button").contains("Войти").click();
    });
});
